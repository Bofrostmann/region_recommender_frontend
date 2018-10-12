export class Region {
    constructor(region, parent=null) {
        this.sub_regions = this._getRegionGroups(region["subregions"]);
        this.name = region["name"];
        this.max_zoom_level = region["maxZoomLevel"];
        this.is_recommender_region = region['is_recommender_region'];
        this.u_name = region["u_name"];
        this.layer = null;
        this.parent = parent;
    }

    getLeafRegions() {
        let ret_object = {};
        if (this.sub_regions) {
            let regions = {};
            for (let i = 0; i < this.sub_regions.length; i++) {
                regions = Object.assign(regions, this.sub_regions[i].getLeafRegions());
            }
            return regions;
        } else {
            ret_object[this.u_name] = this;
            return ret_object;
        }
    };

    _getRegionGroups (regions) {
        if (typeof regions === 'undefined') {
            return null;
        }
        const values = Object.values(regions);
        return values.map(region=> {
            return new Region(region, this);
        });
    };

    insertLayer (feature, layer) {
        if (this.sub_regions) {
            this.sub_regions.forEach(element => {
                element.insertLayer(feature, layer);
            });
        } else if (this.u_name === feature.properties.u_name) {
            this.layer = layer;
        }
    }

    findParentAtZoomLevel (zoom) {
        if (!this.parent || zoom > this.parent.max_zoom_level) {
            return this;
        } else {
            return this.parent.findParentAtZoomLevel(zoom);
        }
    }
}