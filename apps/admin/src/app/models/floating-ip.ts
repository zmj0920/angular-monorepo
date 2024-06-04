export interface AssociateFloatingIPs {
  avail_floatingips: Array<FloatingIp>;
  avail_targets: Array<Nic>;
}

export interface Nic {
  id: string;
  name: string;
  fixed_ips: Array<{ ip_address: string; subnet_id: string}>;
}

export interface FloatingIp {
  id: string;
  ip: string;
  max_mbps: number;
}
