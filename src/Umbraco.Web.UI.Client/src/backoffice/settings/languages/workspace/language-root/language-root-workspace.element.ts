import { Language, LanguageResource } from '@umbraco-cms/backend-api';
import { UmbLitElement } from '@umbraco-cms/element';
import { LanguageDetails } from '@umbraco-cms/models';
import { tryExecuteAndNotify } from '@umbraco-cms/resources';
import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
	UmbTableColumn,
	UmbTableConfig,
	UmbTableElement,
	UmbTableItem,
	UmbTableSelectedEvent,
} from 'src/backoffice/shared/components/table';
import { UmbLanguageStore } from '../../language.store';

import '../language/language-workspace.element';
import './language-root-table-delete-column-layout.element';
import './language-root-table-name-column-layout.element';

@customElement('umb-language-root-workspace')
export class UmbLanguageRootWorkspaceElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}

			umb-table {
				padding: 0;
				margin: var(--uui-size-space-3) var(--uui-size-space-6);
			}
			#add-language {
				margin-left: var(--uui-size-space-6);
			}
		`,
	];

	@state()
	private _languages: Array<LanguageDetails> = [];

	@state()
	private _tableConfig: UmbTableConfig = {
		allowSelection: true,
	};

	@state()
	private _tableColumns: Array<UmbTableColumn> = [
		{
			name: 'Language',
			alias: 'languageName',
			elementName: 'umb-language-root-table-name-column-layout',
		},
		{
			name: 'ISO Code',
			alias: 'isoCode',
		},
		{
			name: 'Default language',
			alias: 'defaultLanguage',
		},
		{
			name: 'Mandatory language',
			alias: 'mandatoryLanguage',
		},
		{
			name: 'Fall back language',
			alias: 'fallBackLanguage',
		},
		{
			name: '',
			alias: 'delete',
			elementName: 'umb-language-root-table-delete-column-layout',
		},
	];

	@state()
	private _tableItems: Array<UmbTableItem> = [];

	private _languageStore?: UmbLanguageStore;

	constructor() {
		super();

		this.consumeContext('umbLanguageStore', (instance) => {
			this._languageStore = instance;
			this._observeLanguages();
		});
	}

	private _observeLanguages() {
		this._languageStore?.getAll().subscribe((languages) => {
			this._languages = languages;
			this._createTableItems(languages);
		});
	}

	private _createTableItems(languages: Array<LanguageDetails>) {
		this._tableItems = languages.map((language) => {
			return {
				key: language.id?.toString() ?? '',
				icon: 'umb:globe',
				data: [
					{
						columnAlias: 'languageName',
						value: {
							name: language.name,
							key: language.key,
						},
					},
					{
						columnAlias: 'isoCode',
						value: language.isoCode,
					},
					{
						columnAlias: 'defaultLanguage',
						value: language.isDefault,
					},
					{
						columnAlias: 'mandatoryLanguage',
						value: language.isMandatory,
					},
					{
						columnAlias: 'fallBackLanguage',
						value: languages.find((x) => x.id === language.fallbackLanguageId)?.name,
					},
					{
						columnAlias: 'delete',
						value: {
							show: !language.isDefault,
						},
					},
				],
			};
		});
	}

	render() {
		return html`
			<umb-body-layout no-header-background>
				<uui-button id="add-language" slot="header" label="Add language" look="outline" color="default"></uui-button>
				<umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems}></umb-table>
			</umb-body-layout>
		`;
	}
}

export default UmbLanguageRootWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-language-root-workspace': UmbLanguageRootWorkspaceElement;
	}
}
