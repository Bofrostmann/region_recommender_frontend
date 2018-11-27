export class Region {
    constructor(regions, parent = null, id = 0) {
        const region = Object.values(regions).find(current_region => id === current_region.id);
        this.sub_regions = this._getSubRegions(regions, region);
        this.name = region.name;
        this.max_zoom_level = region.max_zoom_level;
        this.u_name = region.unique_name;
        this.layer = null;
        this.parent = parent;
    }

    getLeafRegions() {
        let ret_object = {};
        if (this.sub_regions.length) {
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

    _getSubRegions(regions, parent) {
        let ret_array = [];
        Object.values(regions).forEach(region => {
            if (region.parent_id === parent.id && region.parent_id !== region.id) {
                ret_array.push(new Region(regions, this, region.id));
            }
        });
        return ret_array;
    };

    insertLayer(feature, layer) {
        if (this.sub_regions.length) {
            this.sub_regions.forEach(element => {
                element.insertLayer(feature, layer);
            });
        } else if (this.u_name === feature.properties.u_name) {
            this.layer = layer;
        }
    };

    findParentAtZoomLevel(zoom) {
        if (!this.parent || zoom > this.parent.max_zoom_level) {
            return this;
        } else {
            return this.parent.findParentAtZoomLevel(zoom);
        }
    };
}