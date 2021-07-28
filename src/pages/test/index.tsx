import { Form } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import React from 'react'
import AgentSelect from '~/components/AgentSelect'
import CompanySelect from '~/components/CompanySelect'
import Address from '~components/Address'
export default function test() {
    return (
        <div>
            <Form layout="horizontal" style={{ width: "500px" }}>
                <FormItem label='城市'>
                    <Address />
                </FormItem>
                <FormItem label='代理商'>
                    <AgentSelect />
                </FormItem>
                <FormItem label='开发商'>
                    <CompanySelect />
                </FormItem>
                <FormItem >
                </FormItem>
            </Form>
        </div>
    )
}