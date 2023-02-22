import {Accordion} from "flowbite-react";
import React, { ReactNode } from "react";

export default function AccordionComponent({children}: { children: ReactNode}) {

    return (
            <Accordion alwaysOpen={true} style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}}>
                <Accordion.Panel>
                    <Accordion.Title style={{padding: '0.5rem'}}>
                        جستجو
                    </Accordion.Title>
                    <Accordion.Content style={{transition: 'all'}}>
                        {children}
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
    )
}
