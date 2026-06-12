from machine import Pin,ADC
from utime import sleep

led = Pin(16, Pin.OUT)
pot = ADC(Pin(28))

while True:
    valor = pot.read_u16()
    
    delay = (valor / 65535) + 0.05
    
    led.value(1)
    sleep(delay)
    led.value(0)
    sleep(delay)