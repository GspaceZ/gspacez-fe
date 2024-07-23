import { useRef } from 'react'

interface UseFileDialogOptions {
  multiple?: boolean
  accept?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useFileDialog = ({ multiple = false, accept = '', onChange }: UseFileDialogOptions) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  const inputProps = {
    type: 'file',
    ref: fileInputRef,
    style: { display: 'none' },
    multiple,
    accept,
    onChange: handleFileChange
  }

  return { openFileDialog, inputProps }
}

export default useFileDialog
