//   
import { BindingResource, Tag } from 'es-utils/tag';

export type InstanceTaskState = 'SUSPENDING' | 'POWERING-OFF' | 'POWERING-ON' | 'migrating' | null;

export type InstanceOriginalStatusType =
  | 'ACTIVE'          /** 运行中 */
  | 'DELETED'         /** 已删除 */
  | 'BUILD'           /** 正在创建 */
  | 'SHUTOFF'         /** 关机 */
  | 'SUSPENDED'       /** 挂起 */
  | 'PAUSED'          /** 暂停 */
  | 'ERROR'           /** 错误 */
  | 'REBOOT'          /** 重启 */
  | 'HARD_REBOOT'     /** 强制重启 */
  | 'PASSWORD'        /**  */
  | 'REBUILD'         /** 重建 */
  | 'MIGRATING'       /** 正在迁移 */
  | 'RESIZING'        /** 调整规格中 */
  | 'RESCUE'          /** 救援 */
  | 'SOFT_DELETED'    /** 软删除 */
  | 'DELETING';       /** 正在删除 */

export type InstanceStatusType = InstanceTaskState | InstanceOriginalStatusType;

export interface InstanceList {
  id: string;
  locked: boolean;
  name: string;
  uuid: string;
  type?: 'bfv' | 'bfi';
  tags?: Array<Tag>;
  dataNumberDelete?: number;
  rootNumberDelete?: number;
  availability?: string;
  host?: string;
  node?: string;
  originalStatus?: InstanceOriginalStatusType;
  status: InstanceStatusType;
  taskState?: InstanceTaskState;
  hostState?: string;
  imageName?: string;
  flavorType: string;
  flavorId?: string;
  vcpu?: number;
  memory?: number;
  vcpuTag?: string;
  memoryTag?: string;
  hostName: string;
  KeyName: string;
  numaTopology: string;
  cpuPinning: string;
  rootDiskSize?: number;
  rootDiskTag: string;
  gpuNumber: string | number;
  gpuModel: string;
  vgpuNumber?: string | number;
  vgpuModel: string;
  vgpuType?: string;
  gpuProductId?: string;
  gpuVendorId?: string;
  physicalNetwork: Record<string, string>;
  iso: any[];
  attachedVolumes?: Array<{
    id: string,
    name: string;
    status: string,
    size: number,
    volume_type: string;
    attachments: Array<{ device: string }>
  }>;
  usbDevice: Array<{
    key: string;
    product: string;
    manufacturer: string;
    serial_number: string;
    usb_type: string;
    size: string;
  }>;
  bootOrder: Array<string>;
  privateIP: Array<string>;
  floatingIP: Array<string>;
  domain?: string;
  project?: string;
  user?: string;
  created: string;
  vnc?: boolean;
  volumesDetails: any[];
  rootDevice: string;
  volumesAttached: {
    delete_on_termination: true;
    id: string;
  }[];
  deleteTimeState?: boolean;
  rootDeviceName?: string;
  metadata?: any;
  [prop: string]: any;
}

export interface InstanceSource {
  id: string;
  name: string;
  status: InstanceOriginalStatusType;
  'OS-EXT-STS:task_state'?: InstanceTaskState;
  created: string;
  host_state: string;
  locked: boolean;
  vcpus: number;
  memory: number;
  image_display_name: string;
  flavor_type: 'general_computing' | 'computing_optimized' | 'gpu_accelerated';
  flavor_name: string;
  'OS-EXT-SRV-ATTR:hostname': string;
  key_name: string;
  scheduling_policy: string;
  numa_topo: string;
  cpu_pinning: 'disable' | 'enable';
  volumes_details: any[];
  boot_order: string[];
  tags: Tag[];
  domain?: string;
  tenant_id?: string;
  tenant_name?: string;
  [prop: string]: any;
}

export interface InstanceBaseInfo {
  uuid: string;
  name: string;
  region: string;
  availability: string;
  node: string;
  originalStatus: InstanceOriginalStatusType;
  status: InstanceStatusType;
  taskState?: InstanceTaskState;
  imageName: string;
  domain?: string;
  project?: string;
  user?: string;
  created: string;
  createdAt: string;
  tags: InstanceSource['tags'];
}

export interface InstanceDetailConfig {
  flavorType: string;
  flavorName: string;
  vcpus: number;
  vcpusName: string;
  memory: number;
  memoryName: string;
  hostName: string;
  KeyName: string;
  gpuNumber: number;
  gpuModel: string;
  vGpuNumber: number;
  vGpuModel: string;
  vGpuType: string;
  iso: Array<{
    boot_order: number;
    image_name: string;
    image_uuid: string;
  }>;
  usb_attach_details: Array<{
    [prop: string]: 'not_exist' | 'attach_fail' | 'occupied';
  }>;
  usbDevice: Array<{
    key: string;
    product: string;
    manufacturer: string;
    serial_number: string;
    usb_type: string;
    size: string;
    fullName: string;
    errors: Array<'not_exist' | 'attach_fail' | 'occupied'>;
  }>;
  schedulingPolicy: string;
  fault?: {
    message: string;
    code: string;
    details: string;
  };
  instanceGroup: {
    name: string;
    policy: string;
  };
  numaTopology: string;
  cpuPinning: InstanceSource['cpu_pinning'];
  lastNode: string;
  bootOrder: string[];
  imageName: string;
}

export interface BasicInfo {
  title: string;
  rate?: string;
  isLoading?: boolean;
  [prop: string]: any;
  infoList: Array<{
    label: string;
    key?: string;
    value?: string;
    popoverTitle?: string;
    popoverContent?: string;
    [prop: string]: any;
  }>;
}

export interface StorageDetail {
  id: string;
  name: string;
  description: string;
  status: 'available'
  | 'in-use'
  | 'error'
  | 'creating'
  | 'error-extending'
  | 'extending'
  | 'attaching'
  | 'detaching'
  | 'deleting'
  | 'error-deleting'
  | 'downloading'
  | 'backing-up'
  | 'restoring-backup'
  | 'error-restoring'
  | 'maintenance'
  | 'uploading';
  sizeName: string;
  size: number;
  volumeType: string;
  diskProperty: 'root-disk' | 'data-disk';
  deleteOnTermination: boolean;
  deviceName: string;
  bootable: boolean;
  createdAt: string;
  tags: Array<any>;
  tagResource: BindingResource;
  attachments: Array<{
    attached_at: string;
    attachment_id: string;
    device: string;
    host_name: string;
    id: string;
    instance_locked: boolean;
    instance_name: string;
    instance_status: string;
    server_id: string;
    volume_id: string;
  }>;
  multiattach: boolean;
  [prop: string]: any;
}

export interface NetworkSubnet {
  subnet_id: string;
  cidr: string;
  fixed_ip: string;
  ip_version: 4 | 6;
  name: string;
  dns_nameservers: string[];
  [prop: string]: any;
}
export interface NetworkDetail {
  id: string;
  name: string;
  status: string;
  macAddress: string;
  bindingVnicType: string;
  securityGroupNames: string[];
  ipVersion: 'dual-stack' | 'ipv4' | 'ipv6';
  subnets: Array<NetworkSubnet>;
  shared: boolean;
  network: string;
  ipv4?: NetworkSubnet;
  ipv6?: NetworkSubnet;
  maxMbps: string;
  floatingIp: string;
  floatingIpMaxMbps: string;
  qosPolicyId?: string;
  virtualIP: Array<{
    ip_address: string;
    mac_address: string;
  }>;
  tagResource: BindingResource;
  tags?: Array<Tag>;
  tenantId?: string;
  [prop: string]: any;
}

export interface Migrations {
  status: string;
  updatedAt: string;
  destCompute: string;
  migrationType: string;
  id: number;
  createdAt: string;
  sourceCompute: string;
  instanceUuid: string;
  destNode?: any;
  host: string;
}
