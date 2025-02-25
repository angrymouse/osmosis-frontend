import { ChainGetter, ObservableChainQuery, ObservableChainQueryMap } from '@keplr-wallet/stores';
import { SyntheticLockupsByLockId } from './types';
import { KVStore } from '@keplr-wallet/common';

export class ObservableSyntheticLockupsByLockIdInner extends ObservableChainQuery<SyntheticLockupsByLockId> {
	constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter, protected readonly _lockId: string) {
		super(kvStore, chainId, chainGetter, `/osmosis/lockup/v1beta1/synthetic_lockups_by_lock_id/${_lockId}`);
	}

	get lockId(): string {
		return this._lockId;
	}

	get isSyntheticLock(): boolean {
		if (!this.response) {
			return false;
		}

		return this.response.data.synthetic_locks.length > 0;
	}
}

export class ObservableSyntheticLockupsByLockId extends ObservableChainQueryMap<SyntheticLockupsByLockId> {
	constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter) {
		super(kvStore, chainId, chainGetter, (lockId: string) => {
			return new ObservableSyntheticLockupsByLockIdInner(this.kvStore, this.chainId, this.chainGetter, lockId);
		});
	}

	get(lockId: string): ObservableSyntheticLockupsByLockIdInner {
		return super.get(lockId) as ObservableSyntheticLockupsByLockIdInner;
	}
}
