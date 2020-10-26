import React from 'react';

const PeriodExecution = ({leadTime}) => {
    return (
            <div className="leadTimeWrap">
                <span className="leadTime">{leadTime}</span>
            </div>
    );
};

export default PeriodExecution;