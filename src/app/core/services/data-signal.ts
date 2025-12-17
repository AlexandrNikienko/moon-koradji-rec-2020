import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DATAFOLDER } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class DataSignalService {
	private http = inject(HttpClient);

	// Internal signal cache
	private store = signal<Record<string, unknown[]>>({});
	private loading = signal<Record<string, boolean>>({});

	/* --------------------------------
	 * PUBLIC API
	 * -------------------------------- */

	getData<T>(key: string) {
		this.ensureLoaded<T>(key);

		return computed<T[]>(() => {
			return (this.store()[key] as T[]) ?? [];
		});
	}

	isLoading(key: string) {
		return computed(() => !!this.loading()[key]);
	}

	requestToData<T>(key: string) {
		return toObservable(this.getData<T>(key));
	}

	/* --------------------------------
	 * INTERNAL
	 * -------------------------------- */

	private ensureLoaded<T>(key: string): void {
		if (this.store()[key] || this.loading()[key]) return;

		this.loading.update(l => ({ ...l, [key]: true }));

		const url = `${DATAFOLDER}${key}.json`;

		this.http.get<{ [k: string]: T[] }>(url).subscribe({
			next: data => {
				this.store.update(s => ({ ...s, [key]: data[key] }));
				this.loading.update(l => ({ ...l, [key]: false }));
			},
			error: () => {
				this.loading.update(l => ({ ...l, [key]: false }));
			}
		});
	}

	/* --------------------------------
	 * OPTIONAL: CACHE CONTROL
	 * -------------------------------- */

	refresh(key: string): void {
		this.store.update(s => {
			const copy = { ...s };
			delete copy[key];
			return copy;
		});
		this.ensureLoaded(key);
	}

	clear(): void {
		this.store.set({});
		this.loading.set({});
	}
}
