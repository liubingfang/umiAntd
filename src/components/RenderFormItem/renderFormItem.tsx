import React from 'react';
import * as AntdJsComponents from './core/item';
import { Form } from 'antd';
import { tuple } from '@/utils/types';

import type { FormItemProps as AntdFormItemProps, Rule } from 'antd/lib/form';
// import type { AllWidgetProps } from './core/item';

const WidgetTypes = tuple(
  'AInput',
  'AInputTextArea',
  'AInputPassword',
  'ACheckbox',
  'ASelect',
  'ADateRangePicker',
  'ADatePicker',
);

export type WidgetType = typeof WidgetTypes[number];
export interface RenderFormItemPropsType {
  label?: React.ReactNode;
  name: string;
  widget: WidgetType;
  rules?: Rule[];
  required?: boolean;
  initialValue?: any;
  widgetProps?: any;
  formItemProps?: AntdFormItemProps;
  [key: string]: any;
}

const RenderFormItem: React.FC<RenderFormItemPropsType> = (props) => {
  const {
    label,
    name,
    widget,
    rules = [],
    widgetProps = {},
    required,
    initialValue,
    formItemProps = {},
    ...restWidgetProps
  } = props;

  const datePlaceholderMenu = {
    year: '年份',
    month: '月份',
    week: '周',
    date: '日期',
    quarter: '日期',
  };

  if (initialValue !== undefined) {
    formItemProps.initialValue = initialValue;
  }

  const text = widget.includes('AInput') ? '请输入' : '请选择';
  const defaultRule = required
    ? [
        {
          required,
          message: `${text}${label}`,
        },
      ]
    : [];
  const defaultPlaceholder =
    (widget.includes('ADateRangePicker') &&
      widgetProps?.picker && [
        `开始${datePlaceholderMenu[widgetProps?.picker]}`,
        `结束${datePlaceholderMenu[widgetProps?.picker]}`,
      ]) ||
    (widget.includes('ADateRangePicker') && !widgetProps?.picker && ['开始日期', '结束日期']) ||
    `${text}${label}`;
  const widgetRules = [...defaultRule, ...rules];

  if (widget === 'AInput' || widget === 'AInputTextArea' || widget === 'AInputPassword') {
    const AInputType = widget.replace('AInput', '');

    const AInputWidget =
      AInputType === '' ? AntdJsComponents.AInput : AntdJsComponents.AInput[AInputType];

    return (
      <Form.Item label={label} name={name} rules={widgetRules} {...formItemProps}>
        <AInputWidget placeholder={defaultPlaceholder} {...widgetProps} {...restWidgetProps} />
      </Form.Item>
    );
  }

  const WidgetComponent = AntdJsComponents[widget];

  return (
    <Form.Item label={label} name={name} rules={widgetRules} {...formItemProps}>
      <WidgetComponent placeholder={defaultPlaceholder} {...widgetProps} {...restWidgetProps} />
    </Form.Item>
  );
};

export default RenderFormItem;
