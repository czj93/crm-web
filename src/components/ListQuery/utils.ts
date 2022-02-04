type ListType = Array<{
  prop: string;
  defaultValue?: [string, number, Array<any>];
}>;

import { reactive } from "vue";

export function initForm(list: ListType) {
  const form = {};

  list.forEach(item => {
    form[item.prop] = item.defaultValue || "";
  });

  return reactive(form);
}
