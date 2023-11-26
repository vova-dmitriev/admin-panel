export interface IRoute {
  path: string
  name: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
  icon?: JSX.Element
}
