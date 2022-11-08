import { Box, Typography } from "@mui/material";
import { componentCode, hookCode, installCode, providerCode, StartedPageHighlightStyles, TypePageHeaderStyles, vanillaCode } from './constants'
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/dracula';
import { RevealEffect } from "../../RevealEffect";

const GetStarted = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>Getting Started</Typography>
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Installation
      </Typography>
      <RevealEffect component={Box} sx={{ borderRadius: '4px' }}>
        <Box sx={StartedPageHighlightStyles}>
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
      </RevealEffect>
      <Typography variant="h4" component="h4" sx={TypePageHeaderStyles}>
        Base: Register Provider In Parent Component
      </Typography>
      <Box sx={StartedPageHighlightStyles}>
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
      <Box sx={StartedPageHighlightStyles}>
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
      <Box sx={StartedPageHighlightStyles}>
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
      }}>
        <Highlight {...defaultProps} code={vanillaCode} language="tsx" theme={dracula}>
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