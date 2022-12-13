import { css, html, LitElement } from 'lit';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { customElement, property } from 'lit/decorators.js';

/**
 *  @element umb-editor-property-layout
 *  @description - Element for displaying a property in an editor.
 *  @slot editor - Slot for rendering the Property Editor
 *  @slot property-action-menu - Slot for rendering the Property Action Menu
 */
@customElement('umb-editor-property-layout')
export class UmbEditorPropertyLayoutElement extends LitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: grid;
				grid-template-columns: 200px 600px;
				gap: var(--uui-size-layout-2);
			}
			:host {
				border-bottom: 1px solid var(--uui-color-divider);
				padding: var(--uui-size-space-6) 0;
			}
			p {
				margin-bottom: 0;
			}
			#header {
				position: sticky;
				top: var(--uui-size-space-4);
				height: min-content;
			}
		`,
	];

	/**
	 * Label. Name of the property.
	 * @type {string}
	 * @attr
	 * @default ''
	 */
	@property({ type: String })
	public label = '';

	/**
	 * Description: render a description underneath the label.
	 * @type {string}
	 * @attr
	 * @default ''
	 */
	@property({ type: String })
	public description = '';

	render() {
		return html`
			<div id="header">
				<uui-label>${this.label}</uui-label>
				<slot name="property-action-menu"></slot>
				<p>${this.description}</p>
			</div>
			<div>
				<slot name="editor"></slot>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-editor-property-layout': UmbEditorPropertyLayoutElement;
	}
}
