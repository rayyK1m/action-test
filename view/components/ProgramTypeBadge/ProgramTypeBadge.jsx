import React from 'react';

import { Badge } from '@goorm-dev/gds-components';

import { PROGRAM_DIVISION_BADGE } from './ProgramTypeBadge.constants';

function ProgramTypeBadge({ className, division, duration }) {
    return (
        <span className={className}>
            <Badge
                size="sm"
                color={PROGRAM_DIVISION_BADGE[division].color}
                className="mr-1"
            >
                {division}
            </Badge>
            <Badge size="sm" color="dark">
                {duration}
            </Badge>
        </span>
    );
}

export default ProgramTypeBadge;
