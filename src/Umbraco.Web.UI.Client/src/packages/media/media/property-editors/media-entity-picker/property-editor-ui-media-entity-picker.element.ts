import { html, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
import type { UmbNumberRangeValueType } from '@umbraco-cms/backoffice/models';
import type { UmbInputMediaElement } from '@umbraco-cms/backoffice/media';
import type { UmbPropertyEditorConfigCollection } from '@umbraco-cms/backoffice/property-editor';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/extension-registry';

@customElement('umb-property-editor-ui-media-entity-picker')
export class UmbPropertyEditorUIMediaEntityPickerElement extends UmbLitElement implements UmbPropertyEditorUiElement {
	@property({ type: String })
	public value: string | undefined;

	public set config(config: UmbPropertyEditorConfigCollection | undefined) {
		if (!config) return;

		const minMax = config?.getValueByAlias<UmbNumberRangeValueType>('validationLimit');
		this._min = minMax?.min ?? 0;
		this._max = minMax?.max ?? Infinity;
	}

	@state()
	_min: number = 0;

	@state()
	_max: number = Infinity;

	#onChange(event: CustomEvent & { target: UmbInputMediaElement }) {
		this.value = event.target.value;
		this.dispatchEvent(new UmbPropertyValueChangeEvent());
	}

	override render() {
		return html`
			<umb-input-media
				.min=${this._min}
				.max=${this._max}
				.value=${this.value}
				@change=${this.#onChange}></umb-input-media>
		`;
	}
}

export default UmbPropertyEditorUIMediaEntityPickerElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-media-entity-picker': UmbPropertyEditorUIMediaEntityPickerElement;
	}
}
