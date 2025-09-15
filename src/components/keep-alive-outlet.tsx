import KeepAliveIn from './keep-alive-in'

export type KeepAliveOutletProps = {
  children?: React.ReactNode
}

export function KeepAliveOutlet(props: KeepAliveOutletProps) {
  const { children } = props

  return (
    <>
      <KeepAliveIn />
      {children}
    </>
  )
}
