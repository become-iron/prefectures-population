export class SimpleCache {
  private readonly _cache: Record<PropertyKey, any>

  constructor() {
    this._cache = {}
  }

  get(key: PropertyKey) {
    return this._cache[key]
  }

  set(key: PropertyKey, value: any) {
    this._cache[key] = value
  }
}
