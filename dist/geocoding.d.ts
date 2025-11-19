interface Address {
    country?: string;
    country_code?: string;
    state?: string;
    county?: string;
    city?: string;
    [key: string]: string | undefined;
}
interface NominatimResponse {
    address?: Address;
    osm_id?: number;
    osm_type?: string;
    display_name?: string;
    [key: string]: any;
}
interface GeoJSON {
    type: string;
    coordinates?: any;
    geometries?: GeoJSON[];
}
interface BoundaryData {
    geojson: GeoJSON;
    osm_id?: number;
    osm_type?: string;
    display_name?: string;
}
interface CacheStats {
    hits: number;
    misses: number;
}
interface GeocodeCache {
    geocode: Map<string, NominatimResponse>;
    boundary: Map<string, BoundaryData>;
    stats: {
        geocoding: CacheStats;
        boundary: CacheStats;
    };
}
export interface FeatureProperties {
    name: string;
    country: string;
    country_code: string;
    admin_level: number;
    osm_id?: number;
    osm_type?: string;
    display_name?: string;
    state?: string;
    county?: string;
    city?: string;
    _enhanced: {
        best_name: string;
        admin_type: string;
        found_via: string;
    };
}
interface Feature {
    type: 'Feature';
    properties: FeatureProperties;
    geometry: GeoJSON;
}
interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
}
declare const GeocodeCache: GeocodeCache;
export declare function getCountryAtPoint(lat: number, lon: number): Promise<FeatureCollection>;
export { GeocodeCache };
//# sourceMappingURL=geocoding.d.ts.map