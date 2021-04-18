/*
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-04-15 16:42:42
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-16 17:00:23
 */
export default function form() {
    return [
        {
            type: 'radio',
            field: 'labelPosition',
            value: 'left',
            title: '标签位置',
            options: [
                {value: 'right', label: 'right'},
                {value: 'left', label: 'left'},
                {value: 'top', label: 'top'},
            ]
        }, {
            type: 'radio',
            field: 'size',
            value: 'mini',
            title: '标签位置',
            options: [
                {value: 'medium', label: 'medium'},
                {value: 'small', label: 'small'},
                {value: 'mini', label: 'mini'},
            ]
        }, {
            type:"slider",
            field:"slider",
            title:"表单栅格",
            value:[0,52],
            props:{
                min: 0,
                max: 100,
                //range: true,
                defaultValue:30,
            }
        },
        {
            type: 'input',
            field: 'labelWidth',
            value: '125px',
            title: '标签宽度',
        }, {
            type: 'switch',
            field: 'hideRequiredAsterisk',
            value: false,
            title: '隐藏必填字段的标签旁边的红色星号',
        }, {
            type: 'switch',
            field: 'showMessage',
            value: true,
            title: '显示校验错误信息',
        }, {
            type: 'switch',
            field: 'inlineMessage',
            value: false,
            title: '以行内形式展示校验信息',
        },
       
    ];
}