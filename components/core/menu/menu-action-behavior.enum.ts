export enum MenuActionBehavior {
  /* Automatically route in the menu module when action is triggered */
  Router = 'router',
  /* Do not act but emit the action to parent component */
  Emit = 'emit',
  /*  */
  NoAction = 'noAction'
}
