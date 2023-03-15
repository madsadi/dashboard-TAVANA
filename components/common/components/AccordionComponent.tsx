import {Accordion} from "flowbite-react";
import React, { ReactNode } from "react";

export default function AccordionComponent({children,title}: { children: ReactNode,title:string}) {

    return (
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        {title}
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        {children}
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
    )
}

AccordionComponent.defaultProps = {
    title:'جستجو'
}
