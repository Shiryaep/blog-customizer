import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedArticleState, setAppliedArticleState] = useState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedArticleState.fontFamilyOption.value,
          '--font-size': appliedArticleState.fontSizeOption.value,
          '--font-color': appliedArticleState.fontColor.value,
          '--container-width': appliedArticleState.contentWidth.value,
          '--bg-color': appliedArticleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isSidebarOpenInitial={false}
        initialParams={defaultArticleState}
        onApply={setAppliedArticleState}
      />
      <Article />
    </main>
  );
};
