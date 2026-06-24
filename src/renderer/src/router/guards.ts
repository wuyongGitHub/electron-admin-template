// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const beforeEach = async (to) => {
  console.log('beforeEach')
}
//全局后置导航守卫
export const afterEach = () => {
  console.log('afterEach')
}
