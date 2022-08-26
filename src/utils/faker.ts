export let useFaker = (k: any, form) => {
  fakers[k](form);
};

let fakers = {
  project(ctx) {
    ctx.form.title = randomText('Project');
    ctx.form.ref_no = randomText('Ref');
    ctx.form.address = randomText('Address ');
    ctx.form.supervisor_name = randomText('Supervisor ');

    ctx.setForm();
  },
};
function randomText(prefix, min = 1000, max = 2000) {
  return [prefix, getRandomInt(min, max)].join('-');
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
