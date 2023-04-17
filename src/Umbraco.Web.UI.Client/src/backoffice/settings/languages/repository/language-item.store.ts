import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbStoreBase } from '@umbraco-cms/backoffice/store';
import { UmbControllerHostElement } from '@umbraco-cms/backoffice/controller';
import { ArrayState, partialUpdateFrozenArray } from '@umbraco-cms/backoffice/observable-api';
import { LanguageResponseModel } from '@umbraco-cms/backoffice/backend-api';
import type { UmbItemStore } from '@umbraco-cms/backoffice/store';

export const UMB_LANGUAGE_ITEM_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbLanguageItemStore>('UmbLanguageItemStore');

/**
 * @export
 * @class UmbLanguageItemStore
 * @extends {UmbStoreBase}
 * @description -  Store for Languages items
 */
export class UmbLanguageItemStore
	extends UmbStoreBase<LanguageResponseModel>
	implements UmbItemStore<LanguageResponseModel>
{
	constructor(host: UmbControllerHostElement) {
		super(
			host,
			UMB_LANGUAGE_ITEM_STORE_CONTEXT_TOKEN.toString(),
			new ArrayState<LanguageResponseModel>([], (x) => x.isoCode)
		);
	}

	/**
	 * Updates an item in the store
	 * @param {string} isoCode
	 * @param {Partial<LanguageResponseModel>} data
	 * @memberof UmbLanguageItemStore
	 */
	updateItem(isoCode: string, data: Partial<LanguageResponseModel>) {
		this._data.next(partialUpdateFrozenArray(this._data.getValue(), data, (entry) => entry.isoCode === isoCode));
	}

	items(isoCodes: Array<string>) {
		return this._data.getObservablePart((items) => items.filter((item) => isoCodes.includes(item.isoCode ?? '')));
	}
}
