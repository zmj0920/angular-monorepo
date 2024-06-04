    

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class VolumeStatePipe implements PipeTransform {

  static stateMap: any = {
    available: 'ecs.instances.detail.volume_status.available',
    'in_use': 'ecs.instances.detail.volume_status.in_use',
    'is_bootable': 'ecs.instances.detail.volume_status.is_bootable',
    'non_bootable': 'ecs.instances.detail.volume_status.non_bootable',
    'root_disk': 'ecs.instances.detail.volume_status.root_disk',
    'data_disk': 'ecs.instances.detail.volume_status.data_disk',
    error: 'ecs.instances.detail.volume_status.error',
    creating: 'ecs.instances.detail.volume_status.creating',
    'error_extending': 'ecs.instances.detail.volume_status.error_extending',
    extending: 'ecs.instances.detail.volume_status.extending',
    attaching: 'ecs.instances.detail.volume_status.attaching',
    detaching: 'ecs.instances.detail.volume_status.detaching',
    deleting: 'ecs.instances.detail.volume_status.deleting',
    'error_deleting': 'ecs.instances.detail.volume_status.error_deleting',
    downloading: 'ecs.instances.detail.volume_status.downloading',
    'backing_up': 'ecs.instances.detail.volume_status.backing_up',
    'restoring_backup': 'ecs.instances.detail.volume_status.restoring_backup',
    'error_restoring': 'ecs.instances.detail.volume_status.error_restoring',
    maintenance: 'ecs.instances.detail.volume_status.maintenance',
    uploading: 'ecs.instances.detail.volume_status.uploading',
    reverting: 'ecs.instances.detail.volume_status.reverting'
  };

  transform(value: string, ...args: any[]): string {
    if (!value) {
      return '-';
    }
    const val = value.toLowerCase().replace(/-/g, '_');
    return VolumeStatePipe.stateMap[val] || '-';
  }
}

@Pipe({
  name: 'volumeStateClass'
})
export class VolumeStateClassPipe implements PipeTransform {

  transform(value: string): string {
    const val = (value || '').toLowerCase();
    if ([
      'creating',
      'extending',
      'attaching',
      'detaching',
      'deleting',
      'downloading',
      'backing-up',
      'restoring-backup',
      'uploading',
      'reverting'
    ].includes(value)) {
      return 'state--process';
    } else if (['in-use'].includes(value)) {
      return 'state--primary';
    } else if (['available'].includes(value)) {
      return 'state--success';
    } else if (['error', 'error-extending', 'error-deleting', 'error-restoring'].includes(value)) {
      return 'state--error';
    } else if (['maintenance'].includes(value)) {
      return 'state--hand';
    }
    return 'state--default';
  }
}
