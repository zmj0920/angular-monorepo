export interface ApiResponse<T = any> {
  code: number;
  data: T;
}
export interface BatchActionRes {
  items: Array<BatchActionMsg>;
}

export interface BatchActionMsg {
  id: string;
  code: number;
  msg: null | string;
}

export interface DevicePort {
  physical_network: {
    [key: string]: number;
  };
  production_networks: number;
  sriov_enable: boolean;
}

export interface Hypersivor {
  host: string;
  node_gpu: GPU;
  node_vgpu: VGPU;
  nodenic: {
    [key: string]: number;
  };
  state: string;
  status: string;
  zone: string;
  hypervisor: {
    vcpus: number;
    vcpus_used: number;
    hypervisor_type: string;
    ram_allocation_ratio: number;
    cpu_allocation_ratio: number;
    memory_mb: number;
    memory_mb_used: number;
  };
}

export interface GPU {
  count: number;
  free: number;
  used: number;
  nodegpu: Array<{ product_id: string; vendor_id: string }>;
}

export interface VGPU {
  count: number;
  free: number;
  used: number;
  nodevgpu: Array<{ type: string }>;
}

export interface KeyPair {
  id: string;
  name: string;
}

export interface VolumeType {
  id: string;
  name: string;
}

export interface CloneZone {
  zoneName: string;
  disabled: boolean;
  zoneState: { available: boolean };
  hosts: CloneHost[];
}

export interface CloneHost {
  hostname: string;
  vcpus: number;
  vcpus_left: number;
  memory_mb: number;
  memory_mb_left: number;
  cpu_allocation_ratio: number;
  ram_allocation_ratio: number;
  disabled: boolean;
  disabled_reason: string;
}

export interface CloneNetwork {
  subnets: CloneSubnet[];
  subnetDict: {
    [id: string]: number
  };
  networkDict: {
    [id: string]: {
      double_stack: boolean;
      more_ipv4: boolean;
    }
  };
}

export interface CloneSubnet {
  id: string;
  name: string;
  label: string;
  network: string;
  network_id: string;
  ticked: boolean;
  ip_version: number;
  auto_allocate_ipv4: boolean;
}
