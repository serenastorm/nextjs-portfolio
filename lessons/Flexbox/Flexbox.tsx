import { useEffect, useRef, useState, CSSProperties } from "react";
import { AnimatePresence } from "framer-motion";
import { ModuleWrapper } from "components/lessons/ModuleWrapper";
import { Code, HighlightedText, Paragraph } from "components/lessons/Text";
import { useWindowDimensions } from "infrastructure/hooks";
import { Resources } from "components/lessons/Resources";
import { BrowserSupport } from "components/lessons/BrowserSupport";
import { ValueSelector } from "components/lessons/ValueSelector";
import { FlexboxDevTools } from "components/lessons/DevTools";
import { FlexboxPreview } from "./Preview";
import { ScrollProgress, PreviewIntro } from "components/lessons/Preview";
import { Tips } from "components/lessons/Tips";
import { breakpoint } from "components/lessons/Preview/constants";
import {
  defaultDevToolsValues,
  alignContentPossibleValues,
  alignItemsPossibleValues,
  alignSelfPossibleValues,
  justifyContentPossibleValues,
  flexDirectionPossibleValues,
  flexWrapPossibleValues,
} from "./constants";
import {
  ScrollSectionRef,
  AlignContentPossibleValuesProps,
  AlignItemsPossibleValuesProps,
  AlignSelfPossibleValuesProps,
  FlexDirectionPossibleValuesProps,
  FlexWrapPossibleValuesProps,
  JustifyContentPossibleValuesProps,
} from "./types";

const Flexbox = () => {
  const [currentScrollContainer, setCurrentScrollContainer] =
    useState<string>("intro");
  const [alignContent, setAlignContent] =
    useState<AlignContentPossibleValuesProps>("flex-start");
  const [alignItems, setAlignItems] =
    useState<AlignItemsPossibleValuesProps>("flex-start");
  const [alignSelf, setAlignSelf] =
    useState<AlignSelfPossibleValuesProps>("flex-end");
  const [flexDirection, setFlexDirection] =
    useState<FlexDirectionPossibleValuesProps>("row");
  const [flexWrap, setFlexWrap] = useState<FlexWrapPossibleValuesProps>("wrap");
  const [justifyContent, setJustifyContent] =
    useState<JustifyContentPossibleValuesProps>("flex-start");
  const [flexItems, setFlexItems] = useState<number>(1);
  const [devToolsValues, setDevToolsValues] = useState<CSSProperties>(
    defaultDevToolsValues
  );

  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth && windowWidth >= breakpoint;

  const scrollSectionsRefs = useRef<ScrollSectionRef>({
    intro: null,
    displayFlex: null,
    flexDirection: null,
    flexWrap: null,
    justifyContent: null,
    alignItems: null,
    alignContent: null,
    alignSelf: null,
    gap: null,
    order: null,
    flexGrow: null,
    devTools: null,
  });

  useEffect(() => {
    if (scrollSectionsRefs.current) {
      console.log(scrollSectionsRefs.current);
    }
  }, [scrollSectionsRefs]);

  useEffect(() => {
    const updateSectionOnScroll = () => {
      const { innerHeight: windowHeight, scrollY } = window;

      if (scrollSectionsRefs.current) {
        const refsArray = Object.entries(scrollSectionsRefs.current);

        const refsInView = refsArray.filter((ref) => {
          const justifyContentRef = ref[1]?.getBoundingClientRect().top;
          const refIsInView = justifyContentRef
            ? justifyContentRef > windowHeight / 2
            : false;

          return !refIsInView;
        });

        const lastRefInView = refsInView[refsInView.length - 1][0];

        if (scrollY < windowHeight * 0.5) {
          setCurrentScrollContainer("intro");
        } else {
          setCurrentScrollContainer(lastRefInView);
        }
      }
    };

    updateSectionOnScroll();
    window.addEventListener("scroll", updateSectionOnScroll);

    return () => {
      window.removeEventListener("scroll", updateSectionOnScroll);
    };
  }, []);

  const getPreviewContent = () => {
    switch (currentScrollContainer) {
      case "flexDirection":
        return (
          <FlexboxPreview.FlexDirection
            value={flexDirection}
            key="flexDirection"
            id="flexDirection"
            options={flexDirectionPossibleValues}
          />
        );
      case "flexWrap":
        return (
          <FlexboxPreview.FlexWrap
            value={flexWrap}
            key="flexWrap"
            id="flexWrap"
            options={flexWrapPossibleValues}
          />
        );
      case "justifyContent":
        return (
          <FlexboxPreview.JustifyContent
            value={justifyContent}
            key="justifyContent"
            id="justifyContent"
            options={justifyContentPossibleValues}
          />
        );
      case "alignItems":
        return (
          <FlexboxPreview.AlignItems
            value={alignItems}
            key="alignItems"
            id="alignItems"
            options={alignItemsPossibleValues}
          />
        );
      case "alignContent":
        return (
          <FlexboxPreview.AlignContent
            value={alignContent}
            key="alignContent"
            id="alignContent"
            options={alignContentPossibleValues}
          />
        );
      case "alignSelf":
        return (
          <FlexboxPreview.AlignSelf
            value={alignSelf}
            key="alignSelf"
            id="alignSelf"
            options={alignSelfPossibleValues}
          />
        );
      case "gap":
        return <FlexboxPreview.Gap key="gap" />;
      case "order":
        return <FlexboxPreview.Order key="order" />;
      case "displayFlex":
        return <FlexboxPreview.DisplayFlex key="displayFlex" />;
      case "flexGrow":
        return <FlexboxPreview.FlexGrow key="flexGrow" />;
      case "devTools":
        return (
          <FlexboxPreview.DevTools
            value={devToolsValues}
            items={flexItems}
            setItems={setFlexItems}
            key="devTools"
            id="devTools"
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isDesktop && (
        <ModuleWrapper.Preview>
          <AnimatePresence mode="wait">
            {["intro", "displayFlex"].includes(currentScrollContainer) && (
              <PreviewIntro name="displayFlex" title="Flexbox" />
            )}
            {getPreviewContent()}
          </AnimatePresence>
        </ModuleWrapper.Preview>
      )}
      <ModuleWrapper.Content
        title="Flexbox"
        scrollSection={{ name: "intro", refs: scrollSectionsRefs }}
      >
        {!isDesktop && <ScrollProgress />}
        <Paragraph>
          Flexbox allows us to create flexible, responsive layouts without using
          floats or positioning.{" "}
          <HighlightedText>Flexbox is one dimensional:</HighlightedText> it
          deals with one axis at a time (columns or rows). For two dimensional
          layouts, we’ll need to use tables or grids.
        </Paragraph>
        <BrowserSupport feature="flexbox" />
        <ModuleWrapper.Section
          title="Get started"
          // scrollSection={{ name: "displayFlex", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            Add <Code.Inline language="css" code="display: flex;" /> or{" "}
            <Code.Inline language="css" code="display: inline-flex;" /> to your{" "}
            <Code.Syntax type="selector">parent</Code.Syntax> element.
          </Paragraph>
          <Code.Tabs
            language="css"
            tabs={[
              { value: "flex", label: "With flexbox" },
              { value: "box", label: "Without flexbox" },
            ]}
            code={[
              `.parent { 
  padding: 16px;
  display: flex;
}`,
              `.parent { 
  padding: 16px;
}

.child {
  display: inline-block;
}`,
            ]}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.DisplayFlex />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Flex-direction"
          scrollSection={{ name: "flexDirection", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="flex-direction" /> attribute
            sets{" "}
            <HighlightedText>
              the main axis of your flex container
            </HighlightedText>{" "}
            as well as the direction of items (normal or reversed). By default,
            flex items render in a row.
          </Paragraph>
          <ValueSelector
            options={flexDirectionPossibleValues}
            value={flexDirection}
            setValue={setFlexDirection}
            id="flexDirection"
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  flex-direction: ${flexDirection};
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.FlexDirection
              value={flexDirection}
              id="flexDirection"
              options={flexDirectionPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Flex-wrap"
          scrollSection={{ name: "flexWrap", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="flex-wrap" /> attribute sets{" "}
            <HighlightedText>
              the main axis of your flex container
            </HighlightedText>{" "}
            as well as the direction of items (normal or reversed). By default,
            flex items render in a row.
          </Paragraph>
          <ValueSelector
            options={flexWrapPossibleValues}
            value={flexWrap}
            setValue={setFlexWrap}
            id="flexWrap"
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  flex-wrap: ${flexWrap}; /* Default is nowrap */
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.FlexWrap
              value={flexWrap}
              id="flexWrap"
              options={flexWrapPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section title="Flex-flow">
          <Paragraph>
            <Code.Inline language="css" code="flex-flow" /> is a shorthand for
            the <Code.Inline language="css" code="flex-direction" /> and{" "}
            <Code.Inline language="css" code="flex-wrap" /> properties.
          </Paragraph>
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  flex-flow: row wrap; /* Default is row nowrap */
}`}
          />
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Justify-content"
          scrollSection={{ name: "justifyContent", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="justify-content" /> property
            sets the alignment of items{" "}
            <HighlightedText>on the main axis.</HighlightedText>
          </Paragraph>
          <ValueSelector
            options={justifyContentPossibleValues}
            value={justifyContent}
            setValue={setJustifyContent}
            id="justifyContent"
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  flex-direction: ${flexDirection}; /* Default is flex-start */
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.JustifyContent
              value={justifyContent}
              id="justifyContent"
              options={justifyContentPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Align-items"
          scrollSection={{ name: "alignItems", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="align-items" /> property is
            similar to <Code.Inline language="css" code="justify-content" />,
            but it applies to the position of items{" "}
            <HighlightedText>on the cross-axis.</HighlightedText>
          </Paragraph>
          <ValueSelector
            options={alignItemsPossibleValues}
            value={alignItems}
            setValue={setAlignItems}
            id="alignItems"
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  align-items: ${alignItems}; /* Default is stretch */
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.AlignItems
              value={alignItems}
              id="alignItems"
              options={alignItemsPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <Tips
          title="Understanding align-items: baseline;"
          content={
            <>
              <p>
                To understand the baseline value, we need to understand how
                typography works. The “baseline” is the line upon which most
                letters “sit”. In the example below, note how all the letters
                sit on the same line, regardless of font size. Descenders extend
                below the baseline.
              </p>
              <FlexboxPreview.AlignItemsBaseline />
            </>
          }
        />
        <ModuleWrapper.Section
          title="Align-content"
          scrollSection={{ name: "alignContent", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="align-content" /> property
            sets the distribution of space between and around content items
            along the container’s cross axis. It{" "}
            <HighlightedText>
              has no effect on single line flex containers
            </HighlightedText>{" "}
            so it won’t work with{" "}
            <Code.Inline language="css" code="flex-wrap: nowrap;" />
          </Paragraph>
          <ValueSelector
            options={alignContentPossibleValues}
            value={alignContent}
            setValue={setAlignContent}
            id="alignContent"
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  align-content: ${alignContent}; /* Default is normal */
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.AlignContent
              value={alignContent}
              id="alignContent"
              options={alignContentPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Align-self"
          scrollSection={{ name: "alignSelf", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            We can override the{" "}
            <Code.Inline language="css" code="align-items" /> alignment for
            individual flex items, by adding{" "}
            <Code.Inline language="css" code="align-self" />
            to our <Code.Syntax type="selector">child</Code.Syntax> element.
          </Paragraph>
          <ValueSelector
            options={alignSelfPossibleValues}
            value={alignSelf}
            id="alignSelf"
            setValue={setAlignSelf}
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  align-items: flex-start;
}

.child:nth-of-type(2) {
  align-self: ${alignSelf};
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.AlignSelf
              value={alignSelf}
              id="alignSelf"
              options={alignSelfPossibleValues}
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Gap"
          scrollSection={{ name: "gap", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            To add space between flexbox items, use the{" "}
            <Code.Inline language="css" code="colum-gap" /> and{" "}
            <Code.Inline language="css" code="row-gap" /> properties, or the{" "}
            <Code.Inline language="css" code="gap" /> shorthand. Think of it as
            gutters for your rows and columns.
          </Paragraph>
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  row-gap: 24px;
  column-gap: 32px;
}`}
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
  gap: 24px 32px; /* row-gap column-gap */
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.Gap />
          </ModuleWrapper.InlinePreview>
          <BrowserSupport feature="gap" />
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Order"
          scrollSection={{ name: "order", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="order" /> property controls
            the flex items’ order within the flex parent flow. It’s useful
            when you need to reorder items on a specific breakpoint.
          </Paragraph>
          <Code.Block
            language="css"
            code={`.parent {
  @media (min-width: 600px) {
    .secondChild {
      order: 0; /* Default is 1 */
    }
            
    .firstChild {
      order: 1; /* Default is 0 */
    }
  }
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.Order />
          </ModuleWrapper.InlinePreview>
          <Tips
            type="accessibility"
            content="Using row-reverse or column-reverse will reverse the direction of
            the content visually, but the reading order will stay the same for
            screen readers. Make sure the order of your content in the HTML makes sense."
          />
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Flex"
          scrollSection={{ name: "flexGrow", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            The <Code.Inline language="css" code="flex" /> shorthand sets how a
            flex item will grow or shrink to fit{" "}
            <HighlightedText>the available space.</HighlightedText> It’s a
            shorthand for <Code.Inline language="css" code="flex-grow" />,{" "}
            <Code.Inline language="css" code="flex-shrink" />, and{" "}
            <Code.Inline language="css" code="flex-basis" />, and it can be
            specified using one, two, or all three values.
          </Paragraph>
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
}

.child:nth-of-type(2) {
  /* Add to all items to 
  distribute the space equally */
  flex-grow: 1;
}`}
          />
          <Code.Block
            language="css"
            code={`.parent { 
  padding: 16px;
  display: flex;
}

.child:nth-of-type(3) {
  flex-shrink: 2;
}`}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.FlexGrow />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <ModuleWrapper.Section
          title="Debugging flexbox"
          scrollSection={{ name: "devTools", refs: scrollSectionsRefs }}
        >
          <Paragraph>
            Some modern browsers like Chrome or Firefox have flexbox inspectors
            in the dev tools. Usually you can bring them up by clicking on the
            flexbox icon next to the{" "}
            <Code.Inline language="css" code="display: flex;" /> declaration.
            Why don’t you give them a try by centering this div?
          </Paragraph>

          <FlexboxDevTools
            value={devToolsValues}
            setValue={setDevToolsValues}
          />
          <ModuleWrapper.InlinePreview>
            <FlexboxPreview.DevTools
              value={devToolsValues}
              items={flexItems}
              setItems={setFlexItems}
              id="devTools"
            />
          </ModuleWrapper.InlinePreview>
        </ModuleWrapper.Section>
        <Resources
          resources={[
            {
              label: "MDN Flexbox documentation",
              link: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox",
            },
            {
              label:
                "Flexbugs: community-curated list of flexbox issues and cross-browser workarounds for them",
              link: "https://github.com/philipwalton/flexbugs",
            },
          ]}
        />
      </ModuleWrapper.Content>
    </>
  );
};

export default Flexbox;
