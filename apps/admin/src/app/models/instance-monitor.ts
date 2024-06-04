//   
export interface IMetaData {
    name: string;
    unit: string;
    id: string;
    instanceId: string;
    vname: string;
    meter: string;
    size?: number;
    disk_property?: string;
    multiattach?: boolean;
}

export type IChartData = Array<{
    avg: string;
    period_start: string;
}>;

export const mapDays: Record<string, string> = {
    last_day: '1',
    last_week: '7',
    last_month: '30',
    last_half_year: '180',
    interval_2_seconds: '2',
    interval_5_seconds: '2',
};

export interface QGAMetadata {
    cpu: Array<IMetaData>;
    mem: Array<IMetaData>;
    network: Array<IMetaData[]>;
    disk: Array<IMetaData[]>;
}

export interface QGAMetaItem {
    type: string;
    meters?: string[];
    name: string;
    chartType?: string;
    allSelectedLabel?: string;
    meter: string;
    resources: Array<{id: string, name?: string, size?: number, root_disk?: boolean}>;
    instanceId: string;
    unit?: string;
    mapFields: {[key: string]: string} | null;
    valueFloat?: boolean;
    orderList?: string[];
}

export type QGAMonitorData = Array<{
    avg: string | null;
    period_start: string | number;
    rid: string;
    metric: string;
}>;
