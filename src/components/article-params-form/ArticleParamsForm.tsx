import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type OptionType,
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

type ArticleParams = {
  fontFamilyOption: OptionType;
  fontSizeOption: OptionType;
  fontColor: OptionType;
  backgroundColor: OptionType;
  contentWidth: OptionType;
};

type ArticleParamsFormProps = {
  initialParams: ArticleParams;
  onApply: (styles: ArticleParams) => void;
  isOpenInitial?: boolean;
};

export const ArticleParamsForm = ({
  initialParams,
  onApply,
  isOpenInitial = false,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  const [articleParams, setArticleParams] = useState<ArticleParams>(initialParams);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleApply = (): void => {
    onApply(articleParams);
  };

  const handleReset = (): void => {
    setArticleParams(initialParams);
    onApply(initialParams);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Text as={'h2'} size={31} weight={800} uppercase={true} family={'open-sans'}>
            Задайте параметры
          </Text>

          <Select
            selected={articleParams.fontFamilyOption}
            options={fontFamilyOptions}
            title="Шрифт"
            onChange={(option) =>
              setArticleParams((prev) => ({ ...prev, fontFamilyOption: option }))
            }
          />

          <RadioGroup
            name="fontSize"
            selected={articleParams.fontSizeOption}
            options={fontSizeOptions}
            title="Размер шрифта"
            onChange={(option) =>
              setArticleParams((prev) => ({ ...prev, fontSizeOption: option }))
            }
          />

          <Select
            selected={articleParams.fontColor}
            options={fontColors}
            title="Цвет шрифта"
            onChange={(option) =>
              setArticleParams((prev) => ({ ...prev, fontColor: option }))
            }
          />

          <Separator></Separator>

          <Select
            selected={articleParams.backgroundColor}
            options={backgroundColors}
            title="Цвет фона"
            onChange={(option) =>
              setArticleParams((prev) => ({ ...prev, backgroundColor: option }))
            }
          />

          <Select
            selected={articleParams.contentWidth}
            options={contentWidthArr}
            title="Ширина контента"
            onChange={(option) =>
              setArticleParams((prev) => ({ ...prev, contentWidth: option }))
            }
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="reset"
              type="clear"
              onClick={handleReset}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
              onClick={handleApply}
            />
          </div>
        </form>
      </aside>
    </>
  );
};
