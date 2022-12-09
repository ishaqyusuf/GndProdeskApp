export function createActionItem(
  text,
  itemType,
  subtitle = null,
  icon = null,
  iconType = 'ionicon'
) {
  return {
    text,
    itemType,
    subtitle,
    icon,
    iconType,
  };
}
