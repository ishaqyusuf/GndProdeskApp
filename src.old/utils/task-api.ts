import { useState } from 'react';
import { fetchApi } from './use-fetch';

export function taskApi(list, option = null) {
  const [saving, setSaving] = useState(false);
  let api = {
    saving,
    setSaving,
    update(form, slug) {
      setSaving(true);
      list.updateItem(form, slug).then((r) => {
        setSaving(false);
        option && option.close();
      });
      //   fetchApi().patch(['unit-tasks', slug], form);
    },
    notCompleted(item) {
      this.update({
        status_update: true,
        cancel_installation: true,
      });
    },
    installCompleted(item, install_note) {
      this.update({
        status_update: true,
        install_note,
        install_completed: true,
      });
    },
    startProduction(item) {
      this.update({
        status_update: true,
        production_started: true,
      });
    },
    completeProduction(item) {
      this.update({
        status_update: true,
        production_completed: true,
      });
    },
    cancelProduction(item) {
      this.update({
        status_update: true,
        prouction_cancelled: true,
      });
    },
    updateStatus(item, status) {
      this.update({ status, status_update: true }, item.slug);
    },
  };
  return api;
}
