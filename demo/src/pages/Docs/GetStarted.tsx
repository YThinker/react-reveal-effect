import { Box, Typography } from "@mui/material";
import { componentCode, hookCode, installCode, providerCode, StartedPageHighlightStyles, TypePageHeaderStyles, vanillaCode } from './constants'
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/dracula';
import { useRevealEffect } from "../../RevealEffect";
import { useRef } from "react";

const GetStarted = () => {

  const refList = useRef<HTMLElement[]>([]);
  const fillRefList = (el: HTMLElement, index: number) => refList.current[index] = el;

  useRevealEffect({ elementSelector: refList.current }, { effectType: 'border-image', elementEffect: false })

  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>Getting Started</Typography>
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Installation
      </Typography>
      <Box sx={StartedPageHighlightStyles} ref={(el: HTMLElement) => fillRefList(el, 0)}>
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
      <Box sx={StartedPageHighlightStyles} ref={(el: HTMLElement) => fillRefList(el, 1)}>
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
      <Box sx={StartedPageHighlightStyles} ref={(el: HTMLElement) => fillRefList(el, 2)}>
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
      <Box sx={StartedPageHighlightStyles} ref={(el: HTMLElement) => fillRefList(el, 3)}>
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
      <Typography variant="h4" component="h4" sx={{
        ...TypePageHeaderStyles,
        pb: 1
      }}>
        Use Vanilla
      </Typography>
      <Typography component='em' sx={{
        display: 'block',
        color: '#fff',
        mb: 2
      }}>tip: this way to use react-reveal-effect can't get the global configuration</Typography>
      <Box sx={{
        ...StartedPageHighlightStyles,
        mb: 4,
      }}  ref={(el: HTMLElement) => fillRefList(el, 4)}>
        <Highlight {...defaultProps} code={vanillaCode} language={"html" as Language} theme={dracula}>
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