export interface IPage {
  listName;
  url;
  route;
  query;
  filter;
  formScreen;
  refreshable;
  Item;
  Menu;
  add;
  view;
  edit;
  ViewScreen;
}
export default function Page(args: IPage) {}
