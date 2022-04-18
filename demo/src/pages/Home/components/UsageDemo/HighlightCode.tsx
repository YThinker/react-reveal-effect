import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/dracula';
import { useMemo } from "react";
import { TabLabel } from ".";
import { RevealEffect } from "../../../../RevealEffect";
import { hookCode, componentCode } from "./constance";


const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  width: calc(100% - 1em);
  height: calc(100% - 2em);
  padding: 1em 0 1em 1em;
  overflow: auto;
  border-radius: 16px;
  background-color: rgb(0, 30, 60);
`;

interface HighlightCodeProps {
  type: TabLabel
}
const HighlightCode = (props: HighlightCodeProps) => {
  const { type } = props;
  const options = useMemo(() => {
    switch(type) {
      case "Hook":
        return {
          code: hookCode,
          initial: { x: "100%", opacity: 0 },
          exit: { x: "100%", opacity: 0 }
        };
      case "Component":
        return {
          code: componentCode,
          initial: { x: "-100%", opacity: 0 },
          exit: { x: "-100%", opacity: 0 }
        };
    }
  }, [type]);

  return (
    <Box component={motion.div}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ margin: "0px 0px -200px 0px", once: true }}
      sx={(theme) => ({
        position: "relative",
        height: 500,
        maxWidth: 700,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
          width: "94%"
        }
      })}
    >
      <AnimatePresence>
        <StyledMotionDiv key={type}
          initial={options.initial} animate={{ x: 0, opacity: 1 }} exit={options.exit} transition={{ duration: 0.3 }}
        >
          <Box sx={{ width: "100%", height: "100%",overflow: "auto" }}>
            <Highlight {...defaultProps} code={options.code} language="tsx" theme={dracula}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{...style, backgroundColor: "transparent"}}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Box>
        </StyledMotionDiv>
      </AnimatePresence>
    </Box>
  )
}

export default HighlightCode;