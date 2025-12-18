import { Breadcrumb } from 'antd';
import React, { memo } from 'react';

const BreadCrump = () => {
  return <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
};

export default memo(BreadCrump)