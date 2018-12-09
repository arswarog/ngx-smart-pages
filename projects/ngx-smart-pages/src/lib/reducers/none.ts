import { IInputToReduce, IReducerResult, IWidgetReducer } from '../ngx-smart-pages.interface';

export const none: IWidgetReducer = (input: IInputToReduce): IReducerResult => {
    return {
        columns: input.columns,
        rows   : input.rows,
        widgets: input.widgets.map(item => ({
            position: item.position,
        })),
    };
};
