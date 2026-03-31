import { Toaster as SonnerToaster } from 'sonner'

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      richColors
      {...props}
    />
  )
}

export { Toaster }
