function InvitationsList() {
    return (
        <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >
              <div className={classes.logo}>
                <img alt="logo" className="project-logo" src={project}></img>
              </div>
              <div className={classes.project}>
                <Typography color="primary">Accordion 1</Typography>
                <Typography>
                  Congratulations! You were selected to develop this wonderful
                  project and be part of our fantastic team.
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <div className={classes.buttons}>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="outlined"
                >
                  Accept
                </Button>
                <Button
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  Reject
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
          <Divider />
    )
}

export default InvitationsList;