import React from 'react';

const PeriodExecution = ({leadTime}) => {
    return (
            <div className="leadTimeWrap">
                <span className="leadTime">Термін виконання: {leadTime.split('/')[0]}  о {leadTime.split('/')[1]}</span>
            </div>
    );
};

export default PeriodExecution;