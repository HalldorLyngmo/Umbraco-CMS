import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbSectionContext, UMB_SECTION_CONTEXT_TOKEN } from '../section.context';

import '../../tree/context-menu/tree-context-menu.service';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-section-sidebar')
export class UmbSectionSidebarElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				flex: 0 0 300px;
				background-color: var(--uui-color-surface);
				height: 100%;
				border-right: 1px solid var(--uui-color-border);
				font-weight: 500;
				display: flex;
				flex-direction: column;
			}

			h3 {
				padding: var(--uui-size-4) var(--uui-size-8);
			}
		`,
	];

	@state()
	private _sectionLabel = '';

	@state()
	private _sectionPathname = '';

	private _sectionContext?: UmbSectionContext;

	constructor() {
		super();

		this.consumeContext(UMB_SECTION_CONTEXT_TOKEN, (sectionContext) => {
			this._sectionContext = sectionContext;
			this._observeSectionContext();
		});
	}

	private _observeSectionContext() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext.pathname, (pathname) => {
			this._sectionPathname = pathname || '';
		});
		this.observe(this._sectionContext.label, (label) => {
			this._sectionLabel = label || '';
		});
	}

	render() {
		return html`
			<umb-tree-context-menu-service>
				<uui-scroll-container>
					<a href="${`section/${this._sectionPathname}`}">
						<h3>${this._sectionLabel}</h3>
					</a>

					<slot></slot>
				</uui-scroll-container>
			</umb-tree-context-menu-service>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-section-sidebar': UmbSectionSidebarElement;
	}
}
