'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import CheckedLoading from '../CheckedLoading/CheckedLoading'
import { handleBotVerificationSwitch } from '@/lib/actions'
import { useState } from 'react'
import { toast } from 'sonner'

export default function VerifiedSwitch(props: Props) {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(props.verified)
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="verified-switch">Verified</Label>
      <Switch
        id="verified-switch"
        name="verified"
        checked={checked}
        onCheckedChange={(c) => {
          setLoading(true)
          handleBotVerificationSwitch({ id: props.id, verified: c }).then((ver) => {
            setLoading(false)
            // sets to the opposite of the current value, like a normal switch
            setChecked(!checked)
            if (ver.error) {
              toast.error(ver.error)
            }
            if (ver.success) {
              toast.success(ver.message)
            }
          })
        }}
      />
      <CheckedLoading loading={loading} />
    </div>
  )
}

interface Props {
  id: string
  verified: boolean
}
