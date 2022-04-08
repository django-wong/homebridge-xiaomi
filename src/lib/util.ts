export function delayed<T>(ms = 1000, value: Nullable<T> = null): Promise<Nullable<T>> {
	return new Promise<Nullable<T>>((resolve) => {
		setTimeout(() => resolve(value), ms);
	});
}
