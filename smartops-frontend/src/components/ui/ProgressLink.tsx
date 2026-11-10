'use client';

import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { loadingStore } from '@/src/lib/core/loadingStore';

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ProgressLink({ onNavigate, ...props }: Props) {
    return (
        <Link
            {...props}
            onNavigate={(event) => {
                loadingStore.startNavigation();
                onNavigate?.(event);
            }}
        />
    );
}
