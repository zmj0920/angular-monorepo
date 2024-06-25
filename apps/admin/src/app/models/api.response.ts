export interface ApiResponse<T = any> {
  code: number;
  data: T;
}
export interface DevicePort {
  physical_network: {
    [key: string]: number;
  };
  production_networks: number;
  sriov_enable: boolean;
}


