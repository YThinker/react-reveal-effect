import { Box, styled, Typography } from "@mui/material";
import { componentCode, hookCode, installCode, providerCode, TypePageHeaderStyles } from './constants'
import { AnimatePresence, motion } from "framer-motion";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/dracula';
import { useMemo } from "react";

const GetStarted = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>Getting Started</Typography>
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Installation
      </Typography>
      <Box sx={{
        textTransform: "none",
        color: "#fff",
        backgroundColor: "#000",
        padding: "6px 16px"
      }}>
        <Highlight {...defaultProps} code={installCode} language="bash" theme={dracula}>
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
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Base: Register Provider In Parent Component
      </Typography>
      <Box sx={{
        textTransform: "none",
        color: "#fff",
        backgroundColor: "#000",
        padding: "6px 16px"
      }}>
        <Highlight {...defaultProps} code={providerCode} language="tsx" theme={dracula}>
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
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Use Hooks
      </Typography>
      <Box sx={{
        textTransform: "none",
        color: "#fff",
        backgroundColor: "#000",
        padding: "6px 16px"
      }}>
        <Highlight {...defaultProps} code={hookCode} language="tsx" theme={dracula}>
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
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Use Component
      </Typography>
      <Box sx={{
        textTransform: "none",
        color: "#fff",
        backgroundColor: "#000",
        padding: "6px 16px"
      }}>
        <Highlight {...defaultProps} code={componentCode} language="tsx" theme={dracula}>
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
    </>
  )
}

export default GetStarted