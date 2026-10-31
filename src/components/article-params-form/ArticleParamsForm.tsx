import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  initialParams: ArticleStateType;
  onApply: (styles: ArticleStateType) => void;
  isSidebarOpenInitial?: boolean;
};

export const ArticleParamsForm = ({
  initialParams,
  onApply,
  isSidebarOpenInitial = false,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpenInitial);
  const [articleParams, setArticleParams] = useState<ArticleStateType>(initialParams);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const handleApply = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(articleParams);
  };

  const handleReset = (): void => {
    setArticleParams(initialParams);
    onApply(initialParams);
  };

  const updateParam = <K extends keyof ArticleStateType>(
    key: K,
    value: ArticleStateType[K]
  ): void => {
    setArticleParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div ref={sidebarRef}>
        <ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />
        <aside
          className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
        >
          <form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
            <Text as={'h2'} size={31} weight={800} uppercase={true} family={'open-sans'}>
              Задайте параметры
            </Text>

            <Select
              selected={articleParams.fontFamilyOption}
              options={fontFamilyOptions}
              title="Шрифт"
              onChange={(option) => updateParam('fontFamilyOption', option)}
            />

            <RadioGroup
              name="fontSize"
              selected={articleParams.fontSizeOption}
              options={fontSizeOptions}
              title="Размер шрифта"
              onChange={(option) => updateParam('fontSizeOption', option)}
            />

            <Select
              selected={articleParams.fontColor}
              options={fontColors}
              title="Цвет шрифта"
              onChange={(option) => updateParam('fontColor', option)}
            />

            <Separator></Separator>

            <Select
              selected={articleParams.backgroundColor}
              options={backgroundColors}
              title="Цвет фона"
              onChange={(option) => updateParam('backgroundColor', option)}
            />

            <Select
              selected={articleParams.contentWidth}
              options={contentWidthArr}
              title="Ширина контента"
              onChange={(option) => updateParam('contentWidth', option)}
            />

            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        </aside>
      </div>
    </>
  );
};
