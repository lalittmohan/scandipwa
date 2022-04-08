/* eslint-disable import/prefer-default-export */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import {
    Discount, Order, OrderProduct, OrderProductQuantity,
    OrderProducts
} from 'Type/Order.type';

/** @namespace Util/Orders/getFormattedDate */
export const getFormattedDate = (rawDate = ''): string => {
    const date = new Date(rawDate.replace(/\s/, 'T'));
    const RADIX = 10;

    const addLeadingZero = (value: number) => (value < RADIX ? `0${value}` : value);

    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);

    return `${date.getFullYear()}-${month}-${day}`;
};

/** @namespace Util/Orders/formatOrders */
export const formatOrders = (orders: Order[]): Order[] => orders.reduceRight((acc, order) => {
    const { order_date, id: uid } = order;
    const formattedDate = getFormattedDate(order_date);

    return [
        ...acc,
        {
            ...order,
            id: atob(uid),
            created_at: formattedDate
        }
    ];
}, [] as Order[]);

/** @namespace Util/Orders/getOrderItemQtyToArray */
export const getOrderItemQtyToArray = (product: OrderProduct): OrderProductQuantity => {
    const {
        quantity_ordered = 0,
        quantity_canceled = 0,
        quantity_invoiced = 0,
        quantity_refunded = 0,
        quantity_returned = 0,
        quantity_shipped = 0
    } = product;

    return {
        quantity_ordered,
        quantity_canceled,
        quantity_invoiced,
        quantity_refunded,
        quantity_returned,
        quantity_shipped
    };
};

/** @namespace Util/Orders/getProductFromOrder */
export const getProductFromOrder = (
    allProducts: OrderProducts,
    requiredProductSku: string
): OrderProduct | undefined => allProducts.find(({ product_sku }) => product_sku === requiredProductSku);

/** @namespace Util/Orders/getOrderItemRowDiscount */
export const getOrderItemRowDiscount = (discounts: Discount[]): number => discounts
    .reduce((currentValue, { amount: { value } }) => value + currentValue, 0);