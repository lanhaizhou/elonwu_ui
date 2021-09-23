import React from 'react';
import { Text, Title, Link } from '../index';

export default {
  title: 'Components/Base/Text',
  component: Text,
};

const txt = `思源黑体和思源宋体项目的成功离不开我们与 Google 的合作关系，Google
帮助我们启动此项目，并且提供了指导、测试资源和财务支持。思源黑体和思源宋体字体集成到
Google 的泛 Unicode 字体系列（称为 Noto）中。`;

const link = `https://fonts.google.com/specimen/Noto+Serif+SC?subset=chinese-simplified#standard-styles`;

export const Paragraph = () => (
  <div style={{ display: 'grid', gap: 16, padding: 16 }}>
    <Text size="xs">{txt}</Text>

    <Text size="sm">{txt}</Text>

    <Text size="base">{txt}</Text>

    <Text size="lg">{txt}</Text>

    <Text size="xl">{txt}</Text>
  </div>
);

export const Headline = () => (
  <div style={{ display: 'grid', gap: 16, padding: 16 }}>
    <Title size="xs">{txt}</Title>

    <Title size="sm">{txt}</Title>

    <Title size="base">{txt}</Title>

    <Title size="lg">{txt}</Title>

    <Title size="xl">{txt}</Title>
  </div>
);

export const Linkage = () => (
  <div style={{ display: 'grid', gap: 16, padding: 16 }}>
    <Link href={link} size="xs">
      {txt}
    </Link>

    <Link decration="dot" href={link} size="sm">
      {txt}
    </Link>

    <Link decration="none" href={link} size="base">
      {txt}
    </Link>

    <Link decration="wave" href={link} size="lg">
      {txt}
    </Link>

    <Link decration="dash" href={link} size="xl">
      {txt}
    </Link>
  </div>
);
