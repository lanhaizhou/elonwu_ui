import React, { useMemo, useState } from 'react';
import BraftEditor from 'braft-editor';

import { Braft } from '../src';
import { Card } from '@elonwu/web-card';

export default {
  title: 'Components/Form/Braft',
  component: Braft,
};

export const BraftStory = () => {
  const [value, setValue] = useState(BraftEditor.createEditorState());

  const preview = useMemo(() => value?.toHTML() || '', [value]);

  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        gap: 12,
      }}
    >
      <Braft value={value} onChange={setValue} style={{ height: 420 }} />

      <Card style={{ height: 420, overflow: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: preview }} />
      </Card>
    </div>
  );
};
