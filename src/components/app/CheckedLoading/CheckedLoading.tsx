'use client'

import { LoaderIcon } from "lucide-react";

export default function CheckedLoading(props: Props) {
    return props.loading && <LoaderIcon className="animate-spin" />
}

interface Props {
    loading: boolean;
}